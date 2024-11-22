export class TokenService {
  private static TOKEN_KEY = "token";

  static setToken(token: string): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);

    document.cookie = `${
      this.TOKEN_KEY
    }=${token}; expires=${expiryDate.toUTCString()}; path=/; secure; samesite=strict`;
  }

  static getToken(): string | null {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${this.TOKEN_KEY}=`)
    );

    if (!tokenCookie) return null;

    return tokenCookie.split("=")[1];
  }

  static removeToken(): void {
    document.cookie = `${this.TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
