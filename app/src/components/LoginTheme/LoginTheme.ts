import logo from "@/assets/jetpackfulllogo.png";

//TODO: refactor style (not applying on the latest amplify version)

export const Container = {
  fontFamily: `-apple-system,
            BlinkMacSystemFont,
              "Segoe UI",
              Roboto,
              Helvetica,
              Arial,
              sans-serif`,
  fontSize: "14px",
  lineHeight: "18px",
  backgroundColor: "#fafafa",
  textAlign: "left",
  height: "100vh",
  margin: 0,
};

export const NavBar = {
  position: "fixed",
  borderBottom: "1px solid rgba(0,0,0,.0975)",
  top: 0,
  width: "100%",
  zIndex: 1,
  backgroundColor: "#fff",
  height: "77px",
  fontWeight: "300",
};

export const NavRight = {
  textAlign: "right",
};

export const Nav = {
  padding: "26px 40px",
};

export const NavItem = {
  display: "inline-block",
  padding: "10px 5px",
  lineHeight: "20px",
};

export const NavButton = {
  display: "inline-block",
  padding: "6px 12px",
  fontSize: "14px",
  fontWeight: 300,
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  touchAction: "manipulation",
  cursor: "pointer",
  userSelect: "none",
  backgroundImage: "none",
  border: "1px solid #aaa",
  borderRadius: "4px",
  color: "#333",
  backgroundColor: "#fff",
};

export const FormContainer = {
  textAlign: "center",
  paddingTop: "77px",
  margin: 0,
};

export const FormSection = {
  margin: "0 0 10px",
  color: "#262626",
  border: "1px solid #e6e6e6",
  borderRadius: "1px",
  textAlign: "center",
  width: "350px",
  display: "inline-block",
  verticalAlign: "middle",
  before: {
    display: "none",
    width: "500px",
    height: "500px",
    verticalAlign: "middle",
    backgroundSize: "500px 500px",
  },
};

export const ErrorSection = {
  marginBottom: "20px",
  color: "#fff",
  backgroundColor: "#f0ad4e",
  border: "1px solid #eea236",
  borderRadius: "4px",
  textAlign: "left",
};

export const SectionHeader = {
  margin: "22px auto 8px",
  overflow: "hidden",
};

export const SectionHeaderContent = {
  // width: "300px",
  // height: "51px",
  // marginTop: "10px",
  // marginBottom: "10px",
  display: "inline-block",
  // textIndent: "110%",
  whiteSpace: "nowrap",
  backgroundSize: "cover",
  backgroundPosition: "0 0",
  // color:  "white",
  backgroundImage: `url(${logo})`,
};

export const SectionFooterSecondaryContent = {
  display: "none",
};

export const SectionFooter = {
  fontSize: "14px",
  textAlign: "left",
  color: "##262626",
  backgroundColor: "#fff",
  margin: "10px 1px 10px",
  padding: "20px 15px 10px 15px",
  boxSizing: "border-box",
};

export const SectionBody = {
  padding: "0",
  borderBottom: "1px solid rgb(230, 230, 230)",
  minHeight: "200px",
  width: "300px",
  margin: "auto",
};

export const FormRow = {
  margin: "0 40px 6px",
  textAlign: "left",
};

export const ActionRow = {
  margin: "0 40px 6px",
};

export const Input = {
  fontFamily: `-apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Roboto,
                Helvetica,
                Arial,
                sans-serif`,
  display: "block",
  width: "100%",
  background: "#fafafa",
  padding: "9px 0 7px 8px",
  border: "1px solid #efefef",
  borderRadius: "3px",
  fontSize: "14px",
  lineHeight: "18px",
  boxSizing: "border-box",
};

export const Button = {
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "26px",
  padding: "0 8px",
  marginTop: "8px",
  marginBottom: "8px",
  border: "1px solid",
  borderRadius: "3px",
  color: "#fff",
  backgroundColor: "#3897f0",
  borderColor: "#3897f0",
  width: "100%",
  margin: "auto",
};

export const SignInButton = {
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "26px",
  padding: "0 8px",
  margin: "8px 0",
  border: "1px solid",
  borderRadius: "3px",
  color: "#fff",
  backgroundColor: "#3897f0",
  borderColor: "#3897f0",
  width: "100%",
  "#google_signin_btn": { display: "none" },
};

export const Space = {
  display: "none",
};

export const A = {
  color: "#3897f0",
};

export const Pre = {
  overflow: "auto",
  fontFamily: `Menlo,
    Monaco,
    Consolas,
    "Courier New",
    monospace`,
  display: "block",
  padding: "9.5px",
  margin: "0 0 10px",
  fontSize: "13px",
  lineHeight: "1.42857143",
  color: "#333",
  wordBreak: "break-all",
  wordWrap: "break-word",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export const Col6 = {
  display: "inline-block",
  width: "50%",
};

const SectionFooterPrimaryContent = {
  margin: "auto",
};

const LoginTheme = {
  sectionFooterSecondaryContent: SectionFooterSecondaryContent,
  sectionFooterPrimaryContent: SectionFooterPrimaryContent,
  container: Container,
  navBar: NavBar,
  nav: Nav,
  navRight: NavRight,
  navItem: NavItem,
  navButton: NavButton,
  formContainer: FormContainer,
  errorSection: ErrorSection,
  sectionHeader: SectionHeader,
  sectionHeaderContent: SectionHeaderContent,
  sectionBody: SectionBody,
  sectionFooter: SectionFooter,
  formRow: FormRow,
  actionRow: ActionRow,
  space: Space,
  signInButton: SignInButton,
  input: Input,
  button: Button,
  a: A,
  pre: Pre,
  col6: Col6,
  formSection: FormSection,
};

export default LoginTheme;
