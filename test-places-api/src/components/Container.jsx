export default function Container({ children }) {
  return (
    <div
      style={{
        maxWidth: "1000px",
        marginRight: "auto",
        marginLeft: "auto",
        paddingLeft: "32px",
        paddingRight: "32px",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      {children}
    </div>
  );
}
