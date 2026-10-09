import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

import { USER_TYPE } from "@/constant/roles";
import { useRegister } from "@/hooks/auth/useRegistration";
import { type RegisterSchema } from "@/schema/authSchema";

interface RegisterFormProps {
  defaultUserType?: (typeof USER_TYPE)[number];
  availableRoles?: readonly string[];
}

const RegisterForm = ({
  defaultUserType = "player",
  availableRoles = USER_TYPE,
}: RegisterFormProps) => {
  const { handleRegister, isLoading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      mobile: "",
      type: defaultUserType,
      password: "",
    },
  });

  const onSubmit = (data: RegisterSchema) => handleRegister(data);

  return (
    <div className="flex flex-col items-center h-[450px] bg-cover bg-center">
      <h2 className="text-white text-[20px] font-medium font-display text-center mt-16 mb-4 w-[250px]">
        Let’s Get Started!
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-[25px] shadow-[0px_10px_15px_rgba(0,0,0,0.25)] p-8 w-[320px]"
      >
        {/* First Name */}
        <div className="mb-2">
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-black text-base font-light font-display placeholder:text-gray-400"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs pl-1 mt-1 font-display">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-2">
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-black text-base font-light font-display placeholder:text-gray-400"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs pl-1 mt-1 font-display">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Username */}
        <div className="mb-2">
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-black text-base font-light font-display placeholder:text-gray-400"
            placeholder="Username"
            {...register("userName")}
          />
          {errors.userName && (
            <p className="text-red-500 text-xs pl-1 mt-1 font-display">
              {errors.userName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-2">
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-3 text-black text-base font-light font-display placeholder:text-gray-400"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs pl-1 mt-1 font-display">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div className="mb-2">
          <input
            inputMode="numeric"
            maxLength={11}
            className="w-full border border-gray-300 rounded-md p-3 text-black text-base font-light font-display placeholder:text-gray-400"
            placeholder="Mobile"
            {...register("mobile")}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs pl-1 mt-1 font-display">
              {errors.mobile.message}
            </p>
          )}
        </div>

        {/* Role Type */}
        <div className="mb-2">
          <select
            className="w-full h-12 rounded-[10px] bg-white px-3 text-black text-base font-display"
            {...register("type")}
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div className="mb-2 relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded-md p-3 text-black text-base font-light font-display placeholder:text-gray-400"
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs pl-1 mt-1 font-display">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* EKYC ID */}

        <div className="mb-2">
          <input
            className="w-full border border-gray-300 rounded-md p-3 text-black text-base font-light font-display placeholder:text-gray-400"
            placeholder="EKYC Transaction ID"
            {...register("ekycTransactionId")}
          />
          {errors.ekycTransactionId && (
            <p className="text-red-500 text-xs pl-1 mt-1 font-display">
              {errors.ekycTransactionId.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[49px] rounded-[25px] mt-4 text-white text-lg font-medium font-display"
          style={{
            background: "linear-gradient(180deg, #00CB60 0%, #009135 100%)",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Register..." : "Register"}
        </button>

        {/* Already have account? */}
        <p className="text-sm text-gray-500 mt-4 flex justify-center items-center gap-1 font-display">
          Already have an account?
          <Link to="/login" className="text-blue-500 underline font-display">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
