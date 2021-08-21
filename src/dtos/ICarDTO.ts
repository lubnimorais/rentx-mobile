interface IRent {
  period: string;
  price: number;
}

interface IAccessory {
  type: string;
  name: string;
}

interface ICar {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: IRent;
  fuel_type: string;
  thumbnail: string;
  accessories: Array<IAccessory>;
  photos: Array<string>;
}

export { ICar };
