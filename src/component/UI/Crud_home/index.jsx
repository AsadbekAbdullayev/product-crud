import React, { useState, useEffect } from 'react';
import { Input, Select, Button, message, Popconfirm, Empty } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
const CrudHome = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [newProduct, setNewProduct] = useState({
		title: '',
		price: '',
		description: '',
		category: '',
	});
	const [searchTitle, setSearchTitle] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	useEffect(() => {
		const initialProducts = [
			{
				title: 'Apple MacBook Air M2 (2023)',
				price: '1500',
				description:
					"The new MacBook Air, powered by the M2 chip, delivers faster performance, longer battery life, and a stunning 13.6-inch Liquid Retina display. Ultra-slim and lightweight, it's perfect for students and professionals on the go.",
				category: 'Laptops',
			},
		];
		const initialCategories = ['Laptops', 'Phones'];
		console.log(
			JSON.parse(localStorage.getItem('products')),
			'JSON.parse(localStorage.getItem',
		);
		const storedProducts =
			JSON.parse(localStorage.getItem('products'))?.length > 0
				? [...JSON.parse(localStorage.getItem('products'))]
				: initialProducts;
		const storedCategories =
			JSON.parse(localStorage.getItem('categories'))?.length > 0
				? [...JSON.parse(localStorage.getItem('categories'))]
				: initialCategories;

		setProducts(storedProducts);
		setCategories(storedCategories);
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct({ ...newProduct, [name]: value });
	};

	const handleAddProduct = () => {
		if (
			!newProduct.title ||
			!newProduct.price ||
			!newProduct.description ||
			!newProduct.category
		) {
			message.warning('Please fill in all fields');
			return;
		}
		const updatedProducts = [...products, newProduct];
		setProducts(updatedProducts);
		localStorage.setItem('products', JSON.stringify(updatedProducts));
		setNewProduct({ title: '', price: '', description: '', category: '' });
		message.success('Product added successfully');
	};

	const handleAddCategory = (category) => {
		const updatedCategories = [...categories, category];
		setCategories(updatedCategories);
		localStorage.setItem('categories', JSON.stringify(updatedCategories));
		message.success('Category added successfully');
	};

	const handleDeleteCategory = (categoryToDelete) => {
		const updatedCategories = categories.filter(
			(category) => category !== categoryToDelete,
		);
		setCategories(updatedCategories);
		localStorage.setItem('categories', JSON.stringify(updatedCategories));
		message.success('Category deleted successfully');
	};

	const handleDeleteProduct = (productToDelete) => {
		const updatedProducts = products.filter(
			(product) => product.title !== productToDelete.title,
		);
		setProducts(updatedProducts);
		localStorage.setItem('products', JSON.stringify(updatedProducts));
		message.success('Product deleted successfully');
	};

	const filteredProducts = products.filter((product) => {
		return (
			(product.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
				searchTitle === '') &&
			(product.category === selectedCategory || selectedCategory === '')
		);
	});

	return (
		<div className="w-full min-h-screen py-5 flex justify-center items-center flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x bg-[length:200%_200%]">
			<h1 className="text-4xl font-bold text-white mb-4">Product CRUD</h1>
			<div className="bg-white p-5 rounded shadow-md w-1/2 max-[500px]:w-3/4">
				<Input
					type="text"
					name="title"
					placeholder="Title"
					value={newProduct.title}
					onChange={handleInputChange}
					className="mb-2 p-2 border rounded w-full"
				/>
				<Input
					type="number"
					name="price"
					placeholder="Price"
					value={newProduct.price}
					onChange={handleInputChange}
					className="mb-2 p-2 border rounded w-full"
				/>
				<TextArea
					name="description"
					placeholder="Description"
					value={newProduct.description}
					onChange={handleInputChange}
					className="mb-2 p-2 border rounded w-full"
				/>
				<Select
					name="category"
					value={newProduct.category}
					onChange={(value) =>
						setNewProduct({ ...newProduct, category: value })
					}
					placeholder="Select category"
					className="mb-4 min-h-10  rounded w-full"
				>
					<Option value="">Select Category</Option>

					{categories.map((category, index) => (
						<Option key={index} value={category}>
							{category}
						</Option>
					))}
				</Select>
				<Button onClick={handleAddProduct} type="primary" className="w-full">
					Add Product
				</Button>
			</div>
			<div className="bg-white p-4 rounded shadow-md w-1/2 max-[500px]:w-3/4 mt-4">
				<h2 className="text-2xl mb-2">Categories</h2>
				<Input
					type="text"
					placeholder="New Category"
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleAddCategory(e.target.value);
							e.target.value = '';
						}
					}}
					className="mb-2 p-2 border rounded w-full"
				/>
				<ul>
					{categories.map((category, index) => (
						<li key={index} className="my-2 flex justify-between items-center">
							{category}
							<Popconfirm
								title="Are you sure to delete this category?"
								onConfirm={() => handleDeleteCategory(category)}
								okText="Yes"
								cancelText="No"
							>
								<Button type="danger" className="p-1 rounded border-red-600">
									Delete
								</Button>
							</Popconfirm>
						</li>
					))}
				</ul>
			</div>
			<div className="bg-white p-4 rounded shadow-md w-1/2 max-[500px]:w-3/4 mt-4">
				<h2 className="text-2xl mb-2">Products</h2>
				<Input
					type="text"
					placeholder="Search by Title"
					value={searchTitle}
					onChange={(e) => setSearchTitle(e.target.value)}
					className="mb-2 p-2 border rounded w-full"
				/>
				<Select
					placeholder="Filter by Category"
					value={selectedCategory}
					onChange={(value) => setSelectedCategory(value)}
					className="mb-4 min-h-10 rounded w-full"
				>
					<Option value="">All Categories</Option>
					{categories.map((category, index) => (
						<Option key={index} value={category}>
							{category}
						</Option>
					))}
				</Select>
				{filteredProducts.length > 0 ? (
					<ul>
						{filteredProducts.map((product, index) => (
							<li key={index} className="mb-1">
								<strong>{product.title}</strong> - ${product.price}
								<p>{product.description}</p>
								<div className="flex justify-between items-center">
									<p className="border  rounded-md border-blue-400 my-2 mb-5 p-1 w-fit">
										{product.category}
									</p>
									<Popconfirm
										title="Are you sure to delete this product?"
										onConfirm={() => handleDeleteProduct(product)}
										okText="Yes"
										cancelText="No"
									>
										<Button type="danger" className="rounded border-red-600">
											Delete
										</Button>
									</Popconfirm>
								</div>
							</li>
						))}
					</ul>
				) : (
					<Empty description="No Products Found" />
				)}
			</div>
		</div>
	);
};

export default CrudHome;
