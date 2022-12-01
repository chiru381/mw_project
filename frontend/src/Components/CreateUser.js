import React from "react";
import "../Styles/CreateUser.css";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../SharableComponents/Loader";
import Input from "../SharableComponents/Input";

function CreateUser({ onClose, onSubmit, loading }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  function handleClick(data) {
    const userDetails = {
      user_id: data.user_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
    };
    onSubmit(userDetails);
  }

  return (
    <div className="popup-background">
      <div className="create-user-container">
        <CloseIcon className="close-icon" sx={{ fontSize: 35 }} onClick={onClose} />
        <h3>Create New Account</h3>
        <form>
          <div className="inputs-container">
            <Input
              label="First Name"
              placeholder="Enter your first name"
              validation={register("first_name", {
                required: "First Name is required",
              })}
              error={errors.first_name && errors.first_name.message}
            />

            <Input
              label="Last Name"
              placeholder="Enter your last name"
              validation={register("last_name", {
                required: "Last Name is required",
              })}
              error={errors.last_name && errors.last_name.message}
            />

            <div className="inputs userid-input-container">
              <label>User ID</label>
              <input
                className="userid-input"
                type="text"
                placeholder="Enter your User ID"
                {...register("user_id", {
                  required: "User ID is required",
                })}
              />
              {errors.user_id && <small> {errors.user_id.message} </small>}
            </div>

            <Input
              label="Email"
              placeholder="Enter your email"
              validation={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email && errors.email.message}
            />

            <Input
              label="Mobile number"
              placeholder="Enter your mobile number"
              validation={register("phone_number", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]/,
                  message: "Invalid mobile number",
                },
                maxLength: {
                  value: 10,
                  message: "Invalid mobile number",
                },
                minLength: {
                  value: 10,
                  message: "Invalid mobile number",
                },
              })}
              error={errors.phone_number && errors.phone_number.message}
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your Password"
              validation={register("password", { required: "Password is required" })}
              error={errors.password && errors.password.message}
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="Enter your confirm password"
              validation={register("confirm_password", {
                validate: (value) => value === getValues().password || "Passwords do not match",
                required: "Confirm Password is required",
              })}
              error={errors.confirm_password && errors.confirm_password.message}
            />

            <button className="btn" onClick={handleSubmit(handleClick)} disabled={loading}>
              {loading ? <Loader /> : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
