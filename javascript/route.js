export class route {
  routes = {}
  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event

    event.preventDefault()
    window.history.pushState({}, '', event.target.href)
    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    fetch(route)
      .then(data => data.text())
      .then(html => (document.querySelector('#app').innerHTML = html))
    const body = document.querySelector('.body')
    if (pathname == '/') {
      body.classList.add('bghome')
      body.classList.remove('bguniverse')
      body.classList.remove('bgexploration')
    } else if (pathname == '/universe') {
      body.classList.add('bguniverse')
      body.classList.remove('bghome')
      body.classList.remove('bgexploration')
    } else if (pathname == '/exploration') {
      body.classList.add('bgexploration')
      body.classList.remove('bghome')
      body.classList.remove('bguniverse')
    } else {
      body.classList.add('bghome')
      body.classList.remove('bguniverse')
      body.classList.remove('bgexploration')
    }
  }
}
