// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import api from "@/services/api.service";
// import { useAuth } from "@/contexts/AuthProvider";
// import bg3 from "../imgs/bg3.jpg";
// function ProfileSettings(e) {
//   const { loggedInUser } = useAuth();
//   const username = loggedInUser.username;
//   const firstName = loggedInUser.firstName;
//   const lastName = loggedInUser.lastName;
//   const email = loggedInUser.email;

//   const currentPassword = e.target.value;
//   if (currentPassword === loggedInUser.password) {
//     console.log("it's ok");
//   }

//   useEffect(() => {
//     // Fetch user profile data
//     const fetchProfile = async () => {
//       try {
//         const response = await api.get("/user/profile");
//         setProfile(response.data);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     setNewPassword(e.target.value);
//     setPasswordTouched(true);

//     const passwordRegex =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     const isValid = passwordRegex.test(e.target.value);
//     setPasswordValid(isValid);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmNewPassword) {
//       alert("New passwords do not match.");
//       return;
//     }

//     if (!passwordValid && passwordTouched) {
//       alert(
//         "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."
//       );
//       return;
//     }

//     try {
//       await api.put("/user/profile", profile);

//       if (passwordTouched) {
//         await api.post("/user/change-password", {
//           currentPassword,
//           newPassword,
//         });
//       }

//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };

//   return (
//     <div
//       className="bg-cover w-full min-h-screen bg-center"
//       style={{
//         backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%), url(${bg3})`,
//       }}
//     >
//       <div className="max-w-2xl mx-auto py-[7em]">
//         <Card className="shadow-2xl">
//           <CardHeader>
//             <CardTitle className="flex justify-between items-center">
//               <span>Profile Settings</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//               <div className="flex flex-col gap-4">
//                 <div>
//                   <Label>Username:</Label>
//                   <Input
//                     type="text"
//                     name="username"
//                     value={username}
//                     className="bg-indigo-200"
//                   />
//                 </div>
//                 <div>
//                   <Label>First Name:</Label>
//                   <Input type="text" name="firstName" value={firstName} />
//                 </div>
//                 <div>
//                   <Label>Last Name:</Label>
//                   <Input
//                     type="text"
//                     name="lastName"
//                     value={lastName}
//                     className="bg-yellow-200"
//                   />
//                 </div>
//                 <div>
//                   <Label>Email:</Label>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={handleChange}
//                     className="bg-blue-200"
//                   />
//                 </div>
//                 <div>
//                   <Label>Current Password:</Label>
//                   <Input
//                     type="password"
//                     value={currentPassword}
//                     placeholder="Enter your current password"
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label>New Password:</Label>
//                   <Input
//                     type="password"
//                     value={newPassword}
//                     onChange={handlePasswordChange}
//                     placeholder="Enter your new password"
//                     className={
//                       passwordTouched && passwordValid
//                         ? "border-green-500"
//                         : passwordTouched && !passwordValid
//                         ? "border-red-500"
//                         : ""
//                     }
//                   />
//                   {!passwordValid && passwordTouched && (
//                     <span className="text-red-500 text-sm">
//                       Password must contain at least one uppercase letter, one
//                       number, one special character, and be at least 8
//                       characters long.
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <Label>Confirm New Password:</Label>
//                   <Input
//                     type="password"
//                     value={confirmNewPassword}
//                     placeholder="Confirm your new password"
//                     onChange={(e) => setConfirmNewPassword(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <Button
//                 type="submit"
//                 className="bg-purple-700 hover:bg-purple-800"
//               >
//                 Save Changes
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default ProfileSettings;
import React from "react";
import bg3 from "../imgs/bg3.jpg";

function ProfileSettings() {
  return (
    <div
      className="bg-cover w-full min-h-screen bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%), url(${bg3})`,
      }}
    >
      <div className="max-w-2xl mx-auto py-[7em] text-center">
        <h1 className="text-4xl font-bold text-purple-700">Page in Progress</h1>
        <p className="text-lg mt-4 text-gray-700">
          We are working hard to bring this page to you soon.
        </p>
      </div>
    </div>
  );
}

export default ProfileSettings;
