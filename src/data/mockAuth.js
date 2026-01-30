const mockLearner = {
    email: "umar@gmail.com",
    password: "123456",
}

function checkAuth(emailInput, passwordInput) {
    if (emailInput === mockLearner.email && passwordInput === mockLearner.password) {
        return true
    }

    return false;
}

export { checkAuth }