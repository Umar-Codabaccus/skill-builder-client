export const BASE_URL = "https://localhost:7105/api";
const loginEndpoint = "Authentication/login";
const checkEndpoint = "Authentication/is-instructor";

const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function register(firstname, lastname, email, password) {
    const res = {
        data: null,
        error: null,
    };

    try {
        const response = await fetch("https://localhost:7105/api/Authentication/register", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const error = await response.json();

            switch (error.status) {
                case 409:
                    res.error = "Unable to register, account already exist.";
                    break;
                case 400:
                    const validationErrors = {};

                    for (const [key, value] of Object.entries(error.validation_rules_violated)) {
                        if (key.includes("Firstname"))
                            validationErrors.firstname = value;

                        if (key.includes("Lastname"))
                            validationErrors.lastname = value;

                        if (key.includes("Email"))
                            validationErrors.email = value;

                        if (key.includes("Password"))
                            validationErrors.password = value;
                    }

                    res.error = validationErrors;

                    break;
                default:
                    res.error = "Au unexpected error occured";
            }

            return res;
        }

        const data = await response.json();
        res.data = data;
        return res;
    } catch (err) {
        res.error = "Au unexpected error occured";
        return res;
    }
};

export async function login(email, password) {
    const loginResponse = { data: null, error: null };
    
    try {
        const apiResponse = await fetch(`${BASE_URL}/${loginEndpoint}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!apiResponse.ok) {
            const error = await apiResponse.json();

            

            switch (error.status) {
                case 401:
                    loginResponse.error = "Invalid credentials, please try again";
                    break;
                default:
                    loginResponse.error = error;
            }

            return loginResponse;
        }

        loginResponse.data = await apiResponse.json();
        return loginResponse;
    } catch (err) {
        loginResponse.error = "An unexpected error occured."
        return loginResponse;
    }
}

export async function switchAccount() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const result = {
        token: null,
        role: null,
        error: null
    }

    try {
        const apiResponse = await fetch(`${BASE_URL}/Authentication/switch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                role: role
            })
        });

        if (!apiResponse.ok) {
            result.error = "Unable to switch account at the moment, please try again later";
            return result;
        }

        const data = await apiResponse.json();

        result.token = data.token;
        result.role = data.role;

        return result;
    } catch {
        result.error = "Unable to switch account at the moment, please try again later";
        return result;
    }
}

export async function registerInstructorAccount() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const result = {
        token: null,
        role: null,
        error: null
    }

    try {
        const apiResponse = await fetch(`${BASE_URL}/Learner/register/instructor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                role: role
            })
        });

        if (!apiResponse.ok) {
            result.error = "Unable to register an instructor account.";
            return result;
        }

        const data = await apiResponse.json();

        console.log(data);

        result.token = data.value.token;
        result.role = data.value.role;

        return result;
    } catch (err) {
        result.error = "Unable to register an instructor account.";
        return result;
    }
}

export async function checkInstructorAccount() {
    console.log("checkInstructorAccount called");
    const token  = localStorage.getItem("token");

    const result = {
        haveAccount: null,
        error: null,
    }
    
    try {
        
        const apiResponse = await fetch(`${BASE_URL}/${checkEndpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await apiResponse.text();

        if (data === "HaveAnAccount") {
            result.haveAccount = true;
        } else {
            result.haveAccount = false;
        }

        return result;
    } catch (err) {
        result.error = err;
        return result;
    }
}