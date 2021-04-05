interface UIElement {
  addClickListener(onClick: (this: void, e: Event) => void): void
}

class Handler {
  info: string
  onClickBad (this: Handler, e: Event) {
    this.info = e.message
  }
}

let h = new Handler()
UIElement.addClickListener(h.onClickBad.call(Handler))
