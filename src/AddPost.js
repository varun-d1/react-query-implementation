import React, { useState } from "react";
// importing useMutation hook
import { useMutation } from "react-query";
import axios from "axios";

const AddPost = () => {
    // Setting the state with object which have all form fields
    const [fields, setFields] = useState({
        title: "",
        body: "",
        userId: "",
    });

    // setting up post api to add new post using useMutation()
    const { mutate, isError, isLoading, data } = useMutation((newPost) => {
        return axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
    });

    // this function will add input field data to the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    // calling the mutate to run the api
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(fields);
    };

    return (
        <div>
            <h2>Add New Post</h2>
            <form style={{ marginTop: "15px" }} onSubmit={handleSubmit}>
                <tr>
                    <td>Title -</td>
                    <td>
                        <input
                            name="title"
                            onChange={handleChange}
                            value={fields.title}
                            type="text"
                            placeholder="Post Title"
                            required
                        />
                    </td>
                </tr>

                <tr>
                    <td>Body -</td>
                    <td>
                        <textarea
                            name="body"
                            onChange={handleChange}
                            value={fields.body}
                            type="text"
                            placeholder="Post Body"
                            required
                        />
                    </td>
                </tr>

                <tr>
                    <td>User Id -</td>
                    <td>
                        <input
                            name="userId"
                            onChange={handleChange}
                            value={fields.userId}
                            type="text"
                            placeholder="User Id"
                            required
                        />
                    </td>
                </tr>

                <button style={{ marginTop: "10px" }} type="submit">
                    Submit Post
                </button>
            </form>
            {/* If Error Display Error Message */}
            {isError && <h5>Error: Failed to Add New Post</h5>}
            {/* Display Loading Message while calling the api/loading time */}
            {isLoading && <h5>Loading....</h5>}
            {/* Show the new Post data */}
            {data && <pre>{JSON.stringify(data.data, null, "\t")}</pre>}
        </div>
    );
};

export default AddPost;
