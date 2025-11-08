export const signUp = async (data: {
  email: string
  password: string
  confirmPassword: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    )

    const responseBody = await response.json()

    return {
      ok: response.ok,
      status: response.status,
      message: responseBody.message,
      userInfo: responseBody.user,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
