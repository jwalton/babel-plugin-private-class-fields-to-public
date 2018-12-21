class MyClass {
  #secret = 1;

  set _secret(secret) {
    this.#secret = secret;
  }

  get _secret() {
    return this.#secret;
  }

}