namespace Singleton {
  class LazySingleton {
    private static instance: LazySingleton;
    private constructor() {}
    public getInstance() {
      if (!LazySingleton.instance) {
        LazySingleton.instance = new LazySingleton();
      }
      return LazySingleton.instance;
    }
  }
  class HungrySingleton {
    private static instance: HungrySingleton;
    private constructor() {
      HungrySingleton.instance = new HungrySingleton();
    }
    public getInstance() {
      return HungrySingleton.instance;
    }
  }
}
