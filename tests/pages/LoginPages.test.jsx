import { 
    describe,
    it,
    expect,
    vi,
    beforeAll,
    afterEach,
    afterAll
} from "vitest";
import { 
    render,
    screen,
    waitFor,
    createEvent,
    fireEvent
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";


import LoginPage from "../../src/authentication/LoginPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});


vi.mock("../../src/context/AuthContext.jsx", () => {
    useAuth: () => ({
        login: async (email, password) => {
            const res = await fetch("")
        }
    });
})