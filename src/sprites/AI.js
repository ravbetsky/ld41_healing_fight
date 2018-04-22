export default class AI {
  constructor() {
  }

  defineMoveMethods(API) {
    this.moveAPI = API;
  }

  isAtDestination(sp) {

  }

  calcMovements(position, circle) {
    console.log(position, circle);
    return [
      ['moveRight', 800],
      ['moveUp'],
      ['moveRight', 500],
      ['moveLeft', 200],
      ['moveUp'],
      ['moveLeft', 700],
      ['stop']
    ]
  }
}