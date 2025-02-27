import { Box, Container, Text, VStack ,Heading, useColorModeValue, Input, Button, useToast} from "@chakra-ui/react"
import React, { use, useState } from 'react'
import { useProductStore } from "../store/product";


function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const toast=useToast();

    const {createProduct} = useProductStore();

    const handleAddProduct = async () => {
        const {success,message}=await createProduct(newProduct);

        setNewProduct({
            name: "",
            price: "",
            image: "",
        });// arasing the input fields after adding the product
        console.log(success,message);

        if(success){
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        }else{
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        }


        console.log(newProduct);
    };



    console.log("CreatePage loaded");
  return (

    
    <Container maxW={"container.sm"}>
        <VStack
        spacing={8}
        >
            <Heading as="h1" size="2xl" textAlign={"center"} mb={8} >
                Create a New Product
            </Heading>
            <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"} >
                 <Text fontSize="xl">Create a New Item</Text>
                 <VStack spacing={4}>
                    <Input 
                        placeholder="Product Name"
                        name="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <Input 
                        placeholder="Product Price"
                        name="price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                    <Input 
                        placeholder="Product Image"
                        name="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    />
                    <Button
                        colorScheme="teal"
                        onClick={handleAddProduct}
                        w={"full"}
                        
                    >
                        Add Product
                    </Button>
                </VStack>
                 
            

            </Box>

        </VStack>

    </Container>
  
  )
}

export default CreatePage
