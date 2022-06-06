import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist} = useAuth();

    useEffect(()=> {

        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh(); // get access token before we get the require auth component
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false); // prevent endless loadingloop
            }
        }

        // If no access token at all in Auth (avoid to request the refersh token every time we request the protected pages).
        !auth?.accessToken 
            ? verifyRefreshToken() 
            : setIsLoading(false); 
            return () => isMounted = false;
    }, []);

    // useEffect(()=>{
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    // },[isLoading])

    return (
        <>
            {!persist 
                ? <Outlet />
                : isLoading
                    ? <p>Loading... {auth.userId}</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;