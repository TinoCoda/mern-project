import { Box, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";

function HomePage() {
    
    const {fetchProducts, products} = useProductStore();

    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);
    console.log("products", products);
    console.log("HomePage");
  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={4}>
       
          <Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>
        <SimpleGrid columns={{ 
          base: 1, 
          md: 2, 
          lg: 3 
          }} 
          spacing={10}
          w={"full"}
          >

        </SimpleGrid>

        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>

       
    </VStack>
      </Container>
  )
}

export default HomePage
