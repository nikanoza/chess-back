interface PurchaseI {
  productId: string;
  date: string;
  price: number;
}

interface UserI {
  username: string;
  email: string;
  password: string;
  purchase: PurchaseI[];
  address: string;
  verify: boolean;
  id: string;
}

interface VerifyEmailI {
  hash: string;
  email: string;
}

interface PasswordRecoveryI extends VerifyEmailI {}
