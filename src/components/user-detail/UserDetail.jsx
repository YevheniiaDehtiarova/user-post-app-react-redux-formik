import "./UserDetail.css";
import { useEffect, useState } from "react";
import UserForm from "../user-form/UserForm";
import postRoutes from "../app/routes/post.routes";
import Post from "../post/Post"

const UserDetail = ({tableRow, active, setActive, sendUpdateStatus}) => {
  //console.log(active, tableRow, 'USER DETAIL');
  const [userDetailFormActive, setUserDetailFormActive]= useState(false);
  const [postFormActive, setPostFormActive]= useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyScope, setCompanyScope] = useState("");

  const [postData, setPostData] = useState([]);

  const [ userDetailStatus, setUserDetailStatus] = useState(true);

  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    //console.log('useEffect works in userDetail');
    //console.log(tableRow, updatedUser, 'input paramets in use effect detail');
    if(tableRow) {
      setFirstName(tableRow?.firstName);
      setLastName(tableRow?.lastName);
      setUserName(tableRow?.userName);
      setEmail(tableRow?.email);
      setStreet(tableRow?.address?.street);
      setBuilding(tableRow?.address?.building);
      setCity(tableRow?.address?.city);
      setZipcode(tableRow?.address?.zipcode);
      setPhone(tableRow?.phone);
      setWebsite(tableRow?.website);
      setCompanyName(tableRow?.company?.name);
      setCompanyScope(tableRow?.company?.scope);
    }

    if(updatedUser){
    setFirstName(updatedUser?.firstName);
    setLastName(updatedUser?.lastName);
    setUserName(updatedUser?.userName);
    setEmail(updatedUser?.email);
    setStreet(updatedUser?.address?.street);
    setBuilding(updatedUser?.address?.building);
    setCity(updatedUser?.address?.city);
    setZipcode(updatedUser?.address?.zipcode);
    setPhone(updatedUser?.phone);
    setWebsite(updatedUser?.website);
    setCompanyName(updatedUser?.company?.name);
    setCompanyScope(updatedUser?.company?.scope);
    }

  }, [tableRow,sendUpdateStatus,updatedUser]);

   useEffect(() => {
    if(tableRow){
    fetch(
      postRoutes.getAll,
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'POSTS FROM FETCH');
      console.log(tableRow);
      const modifyData = data.filter(item => item.userId === tableRow.id);
      console.log(modifyData, 'MODIFY DATA');
      if(modifyData.length) {
        setPostData(modifyData);
        setPostFormActive(true);
      }
    });
  }
    
   },[tableRow])



   const goBack =() => {
     setActive(false);
     sendUpdateStatus(false);
   }

   const openUserModal = () => {
    console.log('open modal works')
      setUserDetailFormActive(true);
      setUserDetailStatus(false);
   }

   const getUserDetail = (user) => {
    console.log(user, 'ПОЛУЧИЛИ ЮЗЕРА НОВОГО ИЗ ДЕТАЛЕЙ');
    setUserDetailStatus(true);
    setUpdatedUser(user);
   }

   /*useEffect(() => {
    console.log('РАБОТАЕТ НОВЫЙ ЮЗ ЕЭЭФЕКТ');
    console.log(updatedUser, 'UPDATED USER');
    setFirstName(updatedUser?.firstName);
    setLastName(updatedUser?.lastName);
    setUserName(updatedUser?.userName);
    setEmail(updatedUser?.email);
    setStreet(updatedUser?.address?.street);
    setBuilding(updatedUser?.address?.building);
    setCity(updatedUser?.address?.city);
    setZipcode(updatedUser?.address?.zipcode);
    setPhone(updatedUser?.phone);
    setWebsite(updatedUser?.website);
    setCompanyName(updatedUser?.company?.name);
    setCompanyScope(updatedUser?.company?.scope);

   }, [updatedUser])*/



      return (
      active && (
          <div>
            {userDetailStatus && 
            <div>
            <Post posts={postData} active={postFormActive} setActive={setPostFormActive}></Post>
            USER DETAIL WORK
            <div className="user-detail-btn-container">
              <button onClick={goBack}>Go to users</button>
              <button onClick={openUserModal}>Edit User</button>
            </div>
            <div className="user-info_person">
              <h1>User Details</h1>
              <div className="user-info-item">
                <strong>
                  <span>First Name</span>
                </strong>
                <span>{firstName}</span>
              </div>
              <div className="user-info-item">
                <strong>
                  <span>Last Name</span>
                </strong>
                <span>{lastName}</span>
              </div>
              <div className="user-info-item">
                <strong>
                  <span>User name</span>
                </strong>
                <span>{userName}</span>
              </div>
              <div className="user-info-item">
                <strong>
                  <span>Email</span>
                </strong>
                <span>{email}</span>
              </div>
              <div className="user-info-item">
                <strong>
                  <span>Address</span>
                </strong>
                <span>
                  {street} {building} {city} {zipcode}{" "}
                </span>
              </div>
              <div className="user-info-item">
                <strong>
                  <span>Phone</span>
                </strong>
                <span> {phone} </span>
              </div>
              <div className="user-info-item">
                <strong>
                  <span>Website</span>
                </strong>
                <span> {website}</span>
              </div>
              <div className="user-info-item">
                <strong>
                  <span>Company</span>
                </strong>
                <span>
                  {companyName} {companyScope}{" "}
                </span>
              </div>
            </div>
            </div>
           }
            <UserForm  sendUpdateDetail={getUserDetail} activeDetail={userDetailFormActive} setActiveDetail={setUserDetailFormActive} row={tableRow}></UserForm>
          </div>
        )
      );
    }


export default UserDetail;