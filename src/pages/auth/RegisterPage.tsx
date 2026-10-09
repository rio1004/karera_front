import { useParams } from "react-router-dom"
import { USER_TYPE } from "../../constant/roles"
import RegisterForm from "@/components/form/RegisterForm"

interface RegisterPageProps {
  userType?: (typeof USER_TYPE)[number]
}

const RegisterPage = ({ userType }: RegisterPageProps) => {

   const params = useParams()
  
  const targetUserType = userType || (params.role as (typeof USER_TYPE)[number])
  
  const availableRoles = targetUserType ? [targetUserType] : USER_TYPE
  
  return <RegisterForm
        defaultUserType={targetUserType || 'player'}
        availableRoles={availableRoles}
      /> 
}

export default RegisterPage
