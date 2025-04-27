import React from "react";
import registerBackground from "../../images/login.png";
import loginBackground from "../../images/login.png";

function RegisterPage() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url(${registerBackground})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: '#FFFFFF'
            }}
        >
            <div className="position-absolute top-0 start-0 m-3">
                <a
                    href="/login"
                    className="btn btn-light"
                    style={{ backgroundColor: '#e2ccff', color: 'black', border: 'none', borderRadius: '10px' }}
                >
                    &#8592; Back
                </a>
            </div>

            <div className="position-absolute top-0 w-100 text-center mt-3">
                <h6 style={{ color: '#a569ff', fontWeight: 'bold', letterSpacing: '2px' }}>I KNOW IT ALL</h6>
            </div>

            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
                <h3 className="text-center mb-2">Create account</h3>
                <p className="text-center mb-4 text-muted">Enter your details</p>

                <form>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: '#e2ccff', color: 'black' }}
                    >
                        Start
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
