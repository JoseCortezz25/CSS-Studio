export const example = `
<section class="section">
  <div class="container">
      <article class="card">
        <img class="card__image" src="https://i.ibb.co/RT0bjJq/food1.png" />
        <div class="card__data">
          <div class="card__info">
            <h2>Nombre Comida</h2>
            <p>Descripcion de la comida, con ingredientes</p>
          </div>
          <h3 class="card__price">$7.50</h3>
          <button class="card__add">+</button>
        </div>
      </article>
  </div>
</section>
<style>
body {
  font-family: "Open Sans", sans-serif;
  user-select: none;
}
h2,
h3,
p {
  margin: 0;
}
.section {
  padding: 70px 0;
}
.container {
  max-width: 375px;
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template: 1fr / repeat(2, 1fr);
  grid-gap: 25px;
}
.card {
  position: relative;
  max-width: 80%;
  margin: 0 auto;
}
.card__image {
  position: absolute;
  max-width: 130%;
  left: -15%;
  right: 0;
  margin: 0 auto;
  top: -18%;
  z-index: 2;
  transition: all 0.3s ease-out;
  -webkit-filter: drop-shadow(5px 5px 5px #222);
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
}
.card__data {
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #ededed;
  padding-top: calc(100% * 1.18);
  transition: all 0.3s ease-out 0.1s;
}
.card__info {
  padding: 0 10px;
  margin-bottom: 10px;
}
.card__info h2 {
  font-size: 14px;
  font-weight: 800;
}
.card__info p {
  font-size: 10px;
  line-height: 14px;
  color: #a2a2a2;
}
.card__action {
  display: grid;
  grid-template: 30px / 1fr 35px;
}
.card__price {
  height: 30px;
  padding: 0 10px 0 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 800;
}
.card__add {
  overflow: hidden;
  width: 35px;
  height: 30px;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: #222222;
  border: none;
  color: #fff;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in;
}
.card__add:hover {
  opacity: 0.8;
  transform: scale(1.1);
}
.card__add:active {
  opacity: 1;
  transform: scale(0.8);
}
.card:hover .card__image {
  top: -20%;
}
.card:hover .card__data {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
</style>
`;