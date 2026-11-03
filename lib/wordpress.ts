export async function verifyWordPressConnection(
  siteUrl: string,
  username: string,
  appPassword: string
) {
  const token = Buffer.from(
    `${username}:${appPassword}`
  ).toString("base64");

  const response = await fetch(
    `${siteUrl}/wp-json/wp/v2/users/me`,
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed WordPress Authentication"
    );
  }

  return response.json();
}