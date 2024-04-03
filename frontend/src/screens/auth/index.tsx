import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../contexts/mainProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputBox, PasswordBox, ButtonBox } from "../../components/RenderFroms";
import { BiSolidUser, BiSolidLockAlt, BiRightArrowAlt } from "react-icons/bi";

export default function Login() {
  let navigate = useNavigate();
  const { labels, login, isLoading, token } = useContext(MainContext)

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [token])

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(5, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onPressHandle = async (values: any) => {
    login({ ...values })
  };

  return (
    <div className="page-wraper">
      <div className="page-content">
        <div className="aon-login-wrap d-flex">
          <div className="aon-login-left">
            <div className="aon-login-heading">
              <div className="aon-login-text">
                Your Trust is Our Greatest Incentive!
              </div>
              <div className="aon-login-pic">
                <img src="images/banner2/doctor.png" alt="" />
              </div>
            </div>
          </div>
          <div className="aon-login-right d-flex flex-wrap align-items-center">
            <div className="aon-login-area">
              <div className="col-md-12">
                <div className="site-logo login-sign-logo">
                  <a href="index.html"><img src="images/logo-dark.png" alt="" /></a>
                </div>
              </div>
              <div className="col-md-12">
                <div className="login-sign-head">
                  <strong>{labels.signIn}</strong>
                  <span>{labels.signInWelcome}</span>
                </div>
              </div>

              <div className="tab-content" >
                <div className="tab-pane fade show active" id="pills-one" role="tabpanel" aria-labelledby="pills-home-tab">
                  <Formik
                    initialValues={{ email: "a1@admin.com", password: "Demo@123" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onPressHandle(values)}
                  >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                      <div className="aon-login-form">
                        <div className="row">
                          <div className="col-md-12">
                            <InputBox
                              error={errors.email}
                              placeholder="Username"
                              name="email"
                              onChangeText={handleChange("email")}
                              autoCapitalize="none"
                              icon={<BiSolidUser />}
                            />
                          </div>
                          <div className="col-md-12">
                            <PasswordBox
                              error={errors.password}
                              placeholder="Password"
                              name="password"
                              onChangeText={handleChange("password")}
                              icon={<BiSolidLockAlt />}
                            />
                          </div>
                          <div className="col-md-12">
                            <ButtonBox icon={<BiRightArrowAlt />} value={labels.logIn} loading={isLoading} onClick={handleSubmit} />
                          </div>
                        </div>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}