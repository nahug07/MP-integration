import classes from './Product.module.css'

const Product = () => {

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <h1>Integration with</h1>
                <img src="https://i.pinimg.com/originals/71/81/e8/7181e84d50cb87fa4ab9a5a8ab613dbe.jpg" alt="mp-logo" />
            </div>
            <div className={classes.card}>
                <div>
                    <img src='https://res.cloudinary.com/dsx2jopbh/image/upload/v1708345548/cld-sample-5.jpg' alt='product img'/>
                    <h3>Sneakers</h3>
                    <p>$ 2000</p>
                    <button>Buy</button>
                </div>
            </div>
        </div>
    )

}

export default Product