import { useState } from "react";
import axios from "axios";
// Import useQuery Hook from react-query
import { useQuery } from "react-query";

// Import Post Showing Component
import SinglePost from "./SinglePost";
import AddPost from "./AddPost";

// Set Base Url of Api in Axios
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
    // State to hold post id Clicked
    const [clickedPostId, setClickedPostId] = useState();
    const [enableNewPost, setEnableNewPost] = useState(false);
    /*
            Typical Way of Calling API
                - Create 2/3 State
                    - to store loading state, error state and data
                - Call the Api
                - Store the Data in data state, loading and errors also in respective state
        */

    // const fetchPosts = async () => {
    //     const { data } = await axios.get("/posts?_limit=10");
    //     return data;
    // };

    //Calling Api and getting data using useQuery
    /* 
        1st argument is unique key.
        2nd argument is api calling function which includes endpoint
        3rd argument is option for useQuery hook. [many options are there]
    */
    const { data, isError, isLoading } = useQuery("posts", async () => await axios.get("/posts?_limit=10"), {});

    return (
        <>
            <div className="row">
                <div style={{ marginLeft: "15px", maxWidth: "50%" }}>
                    <h1>List of Posts</h1>
                    {/* If Error Display Error Message */}
                    {isError && <h5>Error: Failed to Fetch Posts</h5>}
                    {/* Display Loading Message while calling the api/loading time */}
                    {isLoading && <h5>Loading....</h5>}
                    {/* If Data is present then display the data */}
                    {data &&
                        data.data.map((post, index) => {
                            return (
                                <h3
                                    key={post.id}
                                    onClick={() => setClickedPostId(post.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {index + 1} - {post.title}
                                </h3>
                            );
                        })}
                </div>

                <div style={{ maxWidth: "50%" }}>
                    {/* This part will render when you clicked on the post */}
                    {clickedPostId && <SinglePost id={clickedPostId} />}
                </div>
            </div>
            <hr style={{ marginTop: "10px" }} />
            {/* Add New Post Section */}
            <div style={{ marginTop: "10px", marginLeft: "15px" }}>
                {/* Button to Show and Hide add new post form */}
                <button onClick={() => setEnableNewPost(!enableNewPost)}>Update Post</button>
                {/* if enableNewPost state is true we will render <AddPost /> component */}
                {enableNewPost && <AddPost />}
            </div>
        </>
    );
}

export default App;
