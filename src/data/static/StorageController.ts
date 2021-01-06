const StorageController = {
  keys: {
    'token': '@SAUDE_MAIS:AUTH_TOKEN',
    'id': '@SAUDE_MAIS:USER_ID',
    'doctor_id': '@SAUDE_MAIS:DOCTOR_ID',
  },
  saveUserInfo(id: number, token: string) {
    this.saveToken(token);

    localStorage.setItem(this.keys['id'], id.toString());
  },
  saveDoctorID(doctor_id: number | undefined) {
    if(!doctor_id) {
      return;
    }

    localStorage.setItem(this.keys['doctor_id'], doctor_id.toString());
  },
  getUserID(): number | undefined {
    const id = localStorage.getItem(this.keys['id']);

    if(id === null) {
      return;
    }

    return Number(id);
  },
  getDoctorID(): number | undefined {
    const doctor_id = localStorage.getItem(this.keys['doctor_id']);

    if(doctor_id === null) {
      return;
    }

    return Number(doctor_id);
  },
  saveToken(token: string) {
    localStorage.setItem(this.keys['token'], token);
  },
  getToken() {
    const token = localStorage.getItem(this.keys['token']);

    if(token === null) {
      return;
    }

    return token;
  },
  clearAll() {
    localStorage.clear();
  }
}

export default StorageController;
