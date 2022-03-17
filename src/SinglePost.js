import { useQuery } from "react-query";
import axios from "axios";

const SinglePost = (props) => {
    // Destructure post id from props
    const { id } = props;

    // Call the APi to get Post detail
    const { data, isError, isLoading } = useQuery(`post-${id}`, async () => await axios.get(`/posts/${id}`), {});

    return (
        <div style={{ marginLeft: "15px", marginTop: "10px" }}>
            <h2>Post Details:</h2>
            {/* If Error Display Error Message */}
            {isError && <h5>Error: Failed to Fetch Post with Id {id}</h5>}
            {/* Display Loading Message while calling the api/loading time */}
            {isLoading && <h5>Loading....</h5>}
            {data && (
                <div style={{ border: "1px dashed", padding: "5px" }}>
                    <h4>Post Id - {data.data.id}</h4>
                    <h4>Title - {data.data.title}</h4>
                    <h4>Body - {data.data.body}</h4>
                </div>
            )}
        </div>
    );
};

export default SinglePost;
