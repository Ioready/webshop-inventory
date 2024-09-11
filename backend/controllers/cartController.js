import Cart from "../models/cart.js";
import Orders from "../models/order.js";

export const cart = {
    addToCart : async (req, res) => {
        const { productId, quantity } = req.body;
        const {userId} = req.user;
    
        try {
            // Check if the cart item already exists
            let cartItem = await Cart.findOne({ userId, productId });
    
            if (cartItem) {
                // If it exists, update the quantity
                cartItem.quantity += quantity;
            } else {
                // If not, create a new cart item
                cartItem = new Cart({ userId, productId, quantity });
            }
    
            await cartItem.save();
            res.status(200).json(cartItem);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add to cart' });
        }
    },

    removeFromCart : async (req, res) => {
        const {productId } = req.body;
        const {userId} = req.user;
        try {
            await Cart.findOneAndDelete({ userId, productId });
            res.status(200).json({ message: 'Item removed from cart' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove from cart' });
        }
    },

    updateCartQuantity : async (req, res) => {
        const {productId, quantity } = req.body;
        const {userId} = req.user;
        try {
            const cartItem = await Cart.findOne({ userId, productId });
    
            if (!cartItem) {
                return res.status(404).json({ error: 'Item not found in cart' });
            }
    
            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).json(cartItem);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update cart quantity' });
        }
    },

    getCartItems : async (req, res) => {
        const { userId } = req.user
    
        try {
            const cartItems = await Cart.find({ userId }).select('userId productId quantity'); // Assuming Product schema has name, price, and image fields
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch cart items' });
        }
    },

    createOrder: async (req, res) => {
        const { orderDetails } = req.body;
        const { userId } = req.user;
    
        try {
            // Create a new order document
            const newOrder = new Orders({
                userId,
                orderDetails: orderDetails.product.map(product => ({
                    productId: product._id,
                    quantity: product.quantity,
                    totalAmount: orderDetails.totalWithTax,
                })),
                date: new Date(),
                address: orderDetails.address,
            });
    
            // Save the order to the database
            await newOrder.save();
    
            // Send a success response with the created order object
            res.status(201).json({
                message: 'Order created successfully',
                order: newOrder,
            });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Error creating order' });
        }
    },
    

    getOrder : async (req, res) => {
        try {
            // Fetch all orders from the database
            const orders = await Orders.find()
                .populate('userId')  // Populate user details if there's a User collection
                .populate('orderDetails.productId') // Populate product details if there's a Product collection
                .exec();
    
            // Send the retrieved orders as a response
            res.status(200).json({
                message: 'Orders fetched successfully',
                orders: orders,
            });
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ message: 'Error fetching orders' });
        }
    },

    deleteOrder : async (req, res) => {
        // const { orderId } = req.body;
        const idsArray = req.body.body._id
      
        try {
          // Find and delete the order by its ID
          const deletedOrder = await Orders.deleteMany({ _id: { $in: idsArray } });
      
          if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
          }
      
          // Send a success response
          res.status(200).json({
            message: 'Order deleted successfully',
            order: deletedOrder,
          });
        } catch (error) {
          console.error('Error deleting order:', error);
          res.status(500).json({ message: 'Error deleting order' });
        }
      },

}