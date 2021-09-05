interface IAccessory {
  id: string;
  type: string;
  name: string;
}

interface IPhoto {
  id: string;
  photo: string;
}

interface ICarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: Array<IAccessory>;
  photos: Array<IPhoto>;
}

export { ICarDTO };
