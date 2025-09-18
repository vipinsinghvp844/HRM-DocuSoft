<?php
/**
 * Plugin Name: Custom JWT Auth
 * Description: Provides JWT authentication with access & refresh tokens.
 * Version: 1.1
 * Author: Vipin
 */

// Include JWT library
require_once plugin_dir_path(__FILE__) . 'jwt/JWTExceptionWithPayloadInterface.php';
require_once plugin_dir_path(__FILE__) . 'jwt/ExpiredException.php';
require_once plugin_dir_path(__FILE__) . 'jwt/SignatureInvalidException.php';
require_once plugin_dir_path(__FILE__) . 'jwt/BeforeValidException.php';
require_once plugin_dir_path(__FILE__) . 'jwt/Key.php';
require_once plugin_dir_path(__FILE__) . 'jwt/JWK.php';
require_once plugin_dir_path(__FILE__) . 'jwt/CachedKeySet.php';
require_once plugin_dir_path(__FILE__) . 'jwt/JWT.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Register custom routes
add_action('rest_api_init', function () {
    register_rest_route('custom-jwt/v1', '/login', [
        'methods'  => 'POST',
        'callback' => 'custom_jwt_login',
    ]);

    register_rest_route('custom-jwt/v1', '/refresh', [
        'methods'  => 'POST',
        'callback' => 'custom_jwt_refresh',
    ]);
});

// 🔑 Generate JWT
function custom_generate_jwt($user_id, $exp) {
    $issuedAt = time();
    $payload = [
        'iss' => get_bloginfo('url'),
        'iat' => $issuedAt,
        'exp' => $exp,
        'user_id' => $user_id
    ];
    $secret_key = JWT_AUTH_SECRET_KEY; 
    return JWT::encode($payload, $secret_key, 'HS256');
}

// 🔹 Login endpoint 
function custom_jwt_login(WP_REST_Request $request) {
    $login = sanitize_text_field($request->get_param('username'));
    $password = $request->get_param('password');

	if (empty($login) || empty($password)) {
        return new WP_Error('missing_fields', 'Username/Email and Password are required', ['status' => 400]);
    }
	
	if (!is_email($login) && !validate_username($login)) {
    return new WP_Error('invalid_input', 'Please enter a valid username or email', ['status' => 400]);
}
	
	 if (is_email($login)) {
        $user = get_user_by('email', $login);
        if ($user) {
            $login = $user->user_login; // wp_authenticate username leta hai
        }
    }

    $user = wp_authenticate($login, $password);
    if (is_wp_error($user)) {
        return new WP_Error('invalid_login', 'Invalid credentials', ['status' => 401]);
    }

    // Access token (short expiry)
    $access_token = custom_generate_jwt($user->ID, time() + 3600); // 1 hour

    // Refresh token (long expiry)
    $refresh_token = bin2hex(random_bytes(40));
    update_user_meta($user->ID, '_refresh_token', $refresh_token);
    update_user_meta($user->ID, '_refresh_token_expiry', time() + (7 * 24 * 60 * 60)); // 7 days

    return [
        'access_token'       => $access_token,
        'refresh_token'      => $refresh_token,
        'expires_in'         => 3600,
        'user_id'            => $user->ID,
        'user_email'         => $user->user_email,
        'user_display_name'  => $user->display_name,
        'roles'              => $user->roles,
    ];
}

// 🔹 Refresh token endpoint
function custom_jwt_refresh(WP_REST_Request $request) {
    $refresh_token = sanitize_text_field($request->get_param('refresh_token'));
    if (!$refresh_token) {
        return new WP_Error('missing_token', 'Refresh token is required', ['status' => 400]);
    }

    $user_query = new WP_User_Query([
        'meta_key'   => '_refresh_token',
        'meta_value' => $refresh_token,
        'number'     => 1,
    ]);

    if (empty($user_query->results)) {
        return new WP_Error('invalid_token', 'Refresh token invalid', ['status' => 401]);
    }

    $user   = $user_query->results[0];
    $expiry = get_user_meta($user->ID, '_refresh_token_expiry', true);

    if ($expiry < time()) {
        return new WP_Error('expired_token', 'Refresh token expired', ['status' => 401]);
    }

    // New access token
    $access_token = custom_generate_jwt($user->ID, time() + 3600);

    return [
        'access_token' => $access_token,
        'expires_in'   => 3600
    ];
}

// 🔹 Authentication middleware (JWT verification)
add_filter('determine_current_user', 'custom_jwt_authenticate', 20);

function custom_jwt_authenticate($user_id) {
    $auth = null;

    // Get Authorization header
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $auth = $headers['Authorization'];
        }
    }

    if (!$auth || !preg_match('/Bearer\s(\S+)/', $auth, $matches)) {
        return $user_id; // No token → normal WP user flow
    }

    $token = $matches[1];

    try {
        $decoded = JWT::decode($token, new Key(JWT_AUTH_SECRET_KEY, 'HS256'));
        if (!empty($decoded->user_id)) {
            return (int) $decoded->user_id; // ✅ Set logged-in user
        }
    } catch (Exception $e) {
        return null; // Invalid/expired token
    }

    return $user_id;
}
