export interface User {
  Id: number;
  Name: string;
  LastName: string;
  Age: number;
  Gender: 'male' | 'female';
  Education: string;
  JoiningYear: number;
  City: string;
  PaymentTier: 3;
  EverBrenched: 'Yes' | 'No';
}
