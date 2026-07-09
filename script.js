if (typeof Pi !== "undefined") {
    Pi.init({
        version: "2.0"
    });
}


function addProduct(){

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let imageInput = document.getElementById("image");


    if(name === "" || price === "" || description === ""){
        alert("أكمل بيانات المنتج");
        return;
    }


    let saveProduct = (image)=>{

        let product = {
            name: name,
            price: price,
            description: description,
            image: image,
            seller: localStorage.getItem("username") || "مستخدم"
        };


        let products = JSON.parse(localStorage.getItem("products")) || [];

        products.push(product);

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        alert("تم نشر الإعلان بنجاح");

        window.location.href = "buy.html";

    };


    if(imageInput && imageInput.files.length > 0){

        let reader = new FileReader();

        reader.onload = function(e){
            saveProduct(e.target.result);
        };

        reader.readAsDataURL(imageInput.files[0]);

    } else {

        saveProduct("");

    }

}




let productsBox = document.getElementById("products");


if(productsBox){

    let products = JSON.parse(localStorage.getItem("products")) || [];


    products.forEach(product=>{

        productsBox.innerHTML += `

        <div class="product">

        ${product.image ? "<img src='"+product.image+"'>" : ""}

        <h3>${product.name}</h3>

        <p>السعر: ${product.price} Pi</p>

        <p>${product.description}</p>

        <p>البائع: ${product.seller}</p>

        </div>

        `;

    });

}





function loginWithPi(){

    Pi.authenticate(
        ["username"],

        function(auth){

            localStorage.setItem(
                "pi_username",
                auth.user.username
            );


            alert(
                "تم تسجيل الدخول بحساب Pi: " + auth.user.username
            );


            window.location.href = "index.html";

        },


        function(error){

            alert("فشل تسجيل الدخول إلى Pi");

            console.log(error);

        }

    );

}
