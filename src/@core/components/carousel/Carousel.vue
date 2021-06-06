<template>
  <div class="flex" id="scrol">
    <div class="ProductsContainer">
      <img
        src="https://thursdaydinners.com/wp-content/uploads/2019/07/c-3-768x549.jpg"
      />
      <div class="productInfo">
        
      </div>
    </div>
    <div class="ProductsContainer">
      <img
        src="https://thursdaydinners.com/wp-content/uploads/2019/07/c-3-768x549.jpg"
      />
      
      <div class="productInfo">
        
        
      </div>
    </div>
    <div class="ProductsContainer">
      <img
        src="https://thursdaydinners.com/wp-content/uploads/2019/07/c-3-768x549.jpg"
      />
      <div class="productInfo">
        
      </div>
    </div>
    <div class="ProductsContainer">
      <img
        src="https://thursdaydinners.com/wp-content/uploads/2019/07/c-3-768x549.jpg"
      />
      <div class="productInfo">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let scrol = document.getElementById("scrol");
    let porcentaje = (scrol.scrollWidth * 20) / 100;
    const aver = porcentaje * 5;
    setInterval(() => {
      if (scrol.scrollWidth == aver) {
        scrol.scrollLeft = 20;
      }
      scrol.scrollLeft += porcentaje;
    }, 2000);
  },
};
</script>

<style>
.flex {
  display: flex;
  width: 80vw;
  overflow: hidden;
  scroll-behavior: smooth;
}
.ProductsContainer {
  margin: 0 1vw;
  width: 100%;
  height: 100%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}
img {
  width: 100%;
  height: 120px;
}
.starsAndhash {
  display: flex;
  justify-content: center;
}
.starsAndhash .stars {
  width: 45%;
}
.starsAndhash .hash {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  font-size: 1.7vh;
}
.starsAndhash .hash a {
  margin: 0 1px;
  background: #5c4730;
  padding: 0.1vh 0.1vw;
  color: white;
  text-align: center;
}
.productInfo {
  display: flex;
  flex-direction: column;
  width: 20vw;
}
.productInfo > p {
  padding: 0 1vw;
  text-align: justify;
  margin-bottom: 2vh;
  font-size: 3vh;
}
.productInfo > h1 {
  text-align: center;
  font-size: 4vh;
}
.options {
  background: #1b0b02;
  display: flex;
  height: 3vh;
  justify-content: space-between;
  align-items: center;
  padding: 2vh;
  color: white;
}
.options .increment {
  display: flex;
  align-items: center;
}
.options .increment .fas {
  font-size: 1vh;
}
.options span {
  border-right: 1px solid rgba(299, 299, 299, 0.3);
  padding: 0px 2vw;
}
@media screen and (max-width: 1300px) {
  .productInfo {
    width: 30vw;
  }
}
</style>
