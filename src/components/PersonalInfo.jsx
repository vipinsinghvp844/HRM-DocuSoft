import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetTotalUserActionByUserId } from "../../redux/actions/EmployeeDetailsAction";
import Spinner from "./LoaderSpiner";
import { Box } from "@mui/material";

const PersonalInfo = () => {
  const { loginUserProfile, TotalUsersId } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );
// console.log(TotalUsersId,"============================================");

  const [userInfo, setUserInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("user_id");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await dispatch(GetTotalUserActionByUserId());
        setUserInfo(response);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
      setLoader(false);
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = async () => {
    setLoader(true);
    const response = userInfo;
    setUserInfo(response);
    
    if (response) {
      setIsEditing(false);
    }

    try {
      const token = localStorage.getItem("authtoken");
      await api.put(
        `${import.meta.env.VITE_API_CUSTOM_USERS}/${userId}`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      setLoader(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };
  // console.log(loginUserData,"=========loginUserData");
  // console.log(userInfo,"=========userInfo");

  return (
    <Container>
      {loader ? (
        <Spinner />
      ) : (
        <Row className="justify-content-md-center">
          <Col xs={12} md={12}>
            <h3 className="my-4 text-center text-primary">Personal Info</h3>
            {isEditing ? (
              <Form className="bg-white rounded-lg shadow-lg p-6">
  <Form.Group className="mb-2">
    <Form.Label className="text-gray-600 text-sm font-semibold">First Name</Form.Label>
    <Form.Control
      type="text"
      name="first_name"
      value={userInfo.first_name || ""}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
  </Form.Group>
  <Form.Group className="mb-2">
    <Form.Label className="text-gray-600 text-sm font-semibold">Last Name</Form.Label>
    <Form.Control
      type="text"
      name="last_name"
      value={userInfo.last_name || ""}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
  </Form.Group>
  <Form.Group className="mb-2">
    <Form.Label className="text-gray-600 text-sm font-semibold">Email</Form.Label>
    <Form.Control
      type="email"
      name="user_email"
      value={userInfo.email || ""}
      onChange={handleInputChange}
      disabled
      className="w-full p-2 border border-gray-300 rounded bg-gray-50 cursor-not-allowed"
    />
  </Form.Group>
  <Form.Group className="mb-2">
    <Form.Label className="text-gray-600 text-sm font-semibold">Mobile</Form.Label>
    <Form.Control
      type="text"
      name="mobile"
      value={userInfo.mobile || ""}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
  </Form.Group>
  <Form.Group className="mb-2">
    <Form.Label className="text-gray-600 text-sm font-semibold">Address</Form.Label>
    <Form.Control
      type="text"
      name="address"
      value={userInfo.address || ""}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
  </Form.Group>
 <Box className="flex items-center justify-end mt-2">
   <Button 
    variant="primary" 
    onClick={handleSave}
    className="btn-blue"
  >
    <i className="fas fa-save"></i>
    Save Changes
  </Button>
 </Box>
</Form>            ) : (
                  <div className="personal-info-display p-4 bg-white rounded-lg shadow-lg">
  <div className="grid gap-1">
    <div className="info-item flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-all">
      <label className="text-gray-600 text-sm font-semibold mb-1 block">First Name:</label>
      <p className="text-gray-800 text-lg font-medium">{userInfo.first_name || 'N/A'}</p>
    </div>
    <div className="info-item flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-all">
      <label className="text-gray-600 text-sm font-semibold mb-1 block">Last Name:</label>
      <p className="text-gray-800 text-lg font-medium">{userInfo.last_name || 'N/A'}</p>
    </div>
    <div className="info-item flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-all">
      <label className="text-gray-600 text-sm font-semibold mb-1 block">Email:</label>
      <p className="text-gray-800 text-lg font-medium">{userInfo.email || 'N/A'}</p>
    </div>
    <div className="info-item flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-all">
      <label className="text-gray-600 text-sm font-semibold mb-1 block">Mobile:</label>
      <p className="text-gray-800 text-lg font-medium">{userInfo.mobile || 'N/A'}</p>
    </div>
    <div className="info-item flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-all">
      <label className="text-gray-600 text-sm font-semibold mb-1 block">Address:</label>
      <p className="text-gray-800 text-lg font-medium">{userInfo.address || 'N/A'}</p>
    </div>
  </div>
  <Box className="flex items-center justify-end">
    <Button
    variant="primary" 
    className="btn-blue mt-2"
    onClick={() => setIsEditing(true)}
  >
    <i className="fas fa-edit"></i>
    Edit Profile
  </Button>
  </Box>
</div>              
  )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PersonalInfo;
