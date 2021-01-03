import Service from "../../core/models/Service";
import IServicesRepo from "../abstraction/IServicesRepo";

const list: Service[] = [];

list.push({
  "id": 1,
  "attendance_id": 1,
  "name": "Limpeza nos Olhos (Limpeza Ocular)",
  "description": "A limpeza tem como objetivo remover impurezas da região ocular.",
  "price": 100.00,
  "duration": 600.00
});

list.push({
  "id": 2,
  "attendance_id": 1,
  "name": "Exame de Grau",
  "description": "O exame têm como objetivo encontrar o grau diferencial distorcido que o olho adquiriu até então.",
  "price": 150.00,
  "duration": 600.00
});

list.push({
  "id": 3,
  "attendance_id": 2,
  "name": "Clareamento Dentário",
  "description": "O processo de clareamento dentário remove impurezas e limpa os dentes, deixando-os na cor branca original.",
  "price": 60.00,
  "duration": 600.00
});

list.push({
  "id": 4,
  "attendance_id": 2,
  "name": "Extração",
  "description": "A extração remove um dente que esteja danificado ou comprometido.",
  "price": 50.00,
  "duration": 600.00
});

const ServicesMockRepo: IServicesRepo = {
  async index(attendance_id: number): Promise<Service[]> {
    const result: Service[] = [];

    for(const item of list) {
      if(item.attendance_id === attendance_id) {
        result.push(item);
      }
    }

    return result;
  },
  async show(id: number): Promise<Service> {
    let result: Service | undefined;

    for(let i = 0 ; i < list.length; i++) {
      const item = list[i];

      if(item.id === id) {
        result = item;

        break;
      }
    }

    if(!result) {
      throw('service-not-encountered');
    }

    return result;
  };
  async add(data: Service): Promise<Service> {
    list.push(data);

    return data;
  },
  async update(data: Service): Promise<Service> {
    let result: Service | undefined;

    for(let i = 0 ; i < list.length; i++) {
      const item = list[i];

      if(item.id === data.id) {
        list[i] = {
          ...item,
          ...data
        }
        result = list[i];

        break;
      }
    }

    if(!result) {
      throw('service-not-encountered');
    }

    return result;
  },
  async delete(id: number): Promise<boolean> {
    for(let i = 0 ; i < list.length; i++) {
      const item = list[i];

      if(item.id === id) {
        delete list[i];

        break;
      }
    }

    return true;
  }
}

export default ServicesMockRepo;
