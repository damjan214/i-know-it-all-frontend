import React from "react";

function RegisterPage() {
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: "url('/your-background-image.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
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
