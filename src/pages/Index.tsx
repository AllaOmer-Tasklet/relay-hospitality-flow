const Index = () => (
  <div
    style={{
      background: "#0d0d0d",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}
  >
    <div style={{ textAlign: "center", maxWidth: 560, padding: "0 24px" }}>
      {/* Logo */}
      <div
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: "2rem",
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ color: "#C9962A" }}>&lt; &gt;</span>
        <span style={{ color: "#ffffff", marginLeft: "0.35em" }}>Tasklet</span>
      </div>

      {/* Divider */}
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #444",
          width: 60,
          margin: "0 auto 2.5rem",
        }}
      />

      {/* Heading */}
      <h1
        style={{
          color: "#ffffff",
          fontSize: "2.25rem",
          fontWeight: 700,
          margin: "0 0 1.5rem",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        Something new is coming.
      </h1>

      {/* Body */}
      <p
        style={{
          color: "#c0c0c0",
          fontSize: "1.0625rem",
          lineHeight: 1.7,
          margin: "0 0 2rem",
        }}
      >
        We're rebuilding Tasklet from the ground up. Check back soon or drop us
        a line if you'd like to know when we go live.
      </p>

      {/* Email */}
      <a
        href="mailto:contact@tasklet.uk"
        style={{
          color: "#C9962A",
          textDecoration: "underline",
          textUnderlineOffset: 3,
          fontSize: "1rem",
          letterSpacing: "0.01em",
        }}
      >
        contact@tasklet.uk
      </a>
    </div>
  </div>
);

export default Index;
