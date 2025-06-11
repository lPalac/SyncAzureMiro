/**
 * Validates that all required environment variables are set
 * Call this at app startup to catch configuration issues early
 */
export function validateEnvironment() {
  const requiredVars = [
    "MIRO_CLIENT_ID",
    "MIRO_CLIENT_SECRET",
    "MIRO_REDIRECT_URI",
  ];

  const missing = [];
  const warnings = [];

  // Check required variables
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  // Check redirect URI format
  if (process.env.MIRO_REDIRECT_URI) {
    const redirectUri = process.env.MIRO_REDIRECT_URI;
    const expectedLocal = "http://localhost:3000/api/auth/miro/callback";
    const isLocalDev = process.env.NODE_ENV === "development";

    if (isLocalDev && redirectUri !== expectedLocal) {
      warnings.push(
        `MIRO_REDIRECT_URI should be "${expectedLocal}" for local development`
      );
    }

    if (!redirectUri.includes("/api/auth/miro/callback")) {
      warnings.push(
        'MIRO_REDIRECT_URI should end with "/api/auth/miro/callback"'
      );
    }
  }

  // Optional variables check
  const optionalVars = ["AZURE_DEVOPS_ORG", "AZURE_DEVOPS_PAT"];
  for (const varName of optionalVars) {
    if (!process.env[varName]) {
      warnings.push(
        `${varName} is not set (optional, needed for Azure DevOps integration)`
      );
    }
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
    summary:
      missing.length === 0
        ? "✅ All required environment variables are set"
        : `❌ Missing required environment variables: ${missing.join(", ")}`,
  };
}

/**
 * Logs environment validation results
 */
export function logEnvironmentStatus() {
  const validation = validateEnvironment();

  console.log("\n🔧 Environment Configuration Check:");
  console.log(validation.summary);

  if (validation.warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    validation.warnings.forEach((warning) => console.log(`   - ${warning}`));
  }

  if (!validation.isValid) {
    console.log("\n📋 To fix this:");
    console.log("   1. Create a .env.local file in your project root");
    console.log("   2. Add the missing variables:");
    validation.missing.forEach((varName) => {
      console.log(`      ${varName}=your_value_here`);
    });
    console.log(
      "   3. Update your Miro app redirect URI to: http://localhost:3000/api/auth/miro/callback"
    );
  }

  console.log("");
  return validation;
}
