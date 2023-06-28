export function TopSales() {
  return (
    <section class="top-sales">
      <h2 class="text-center">Хиты продаж!</h2>
      <div class="row">
        <div class="col-4">
          <div class="card">
            <img
              src="./img/products/sandals_myer.jpg"
              class="card-img-top img-fluid"
              alt="Босоножки 'MYER'"
            />
            <div class="card-body">
              <p class="card-text">Босоножки 'MYER'</p>
              <p class="card-text">34 000 руб.</p>
              <a href="/products/1.html" class="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <img
              src="./img/products/sandals_keira.jpg"
              class="card-img-top img-fluid"
              alt="Босоножки 'Keira'"
            />
            <div class="card-body">
              <p class="card-text">Босоножки 'Keira'</p>
              <p class="card-text">7 600 руб.</p>
              <a href="/products/1.html" class="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <img
              src="./img/products/superhero_sneakers.jpg"
              class="card-img-top img-fluid"
              alt="Супергеройские кеды"
            />
            <div class="card-body">
              <p class="card-text">Супергеройские кеды</p>
              <p class="card-text">1 400 руб.</p>
              <a href="/products/1.html" class="btn btn-outline-primary">
                Заказать
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
