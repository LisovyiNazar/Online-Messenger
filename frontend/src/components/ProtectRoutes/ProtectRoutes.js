import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectRoutes = () => {
    const { authenticate } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (authenticate === false) {
            navigate("/messenger/login")
        } else {
            navigate("/")
        }
    }, [])
}

export default ProtectRoutes