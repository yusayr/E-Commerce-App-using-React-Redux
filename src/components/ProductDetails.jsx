function ProductDetails({ product, onClose }) {
    if (!product) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
                onClick={(e) => e.stopPropagation()} 
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h1 className="text-2xl font-bold mb-4">Detail</h1>

                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full max-h-80 object-contain rounded-md mb-4"
                />

                <div className="text-lg font-semibold text-gray-900 mb-2">
                    ${product.price}
                </div>

                <p className="text-gray-600 text-sm">{product.description}</p>
            </div>
        </div>
    );
}

export default ProductDetails;
