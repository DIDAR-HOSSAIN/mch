import { useForm } from '@inertiajs/react';
import React from 'react';

const ItemForm = () => {
const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
});

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await post(route("posts.store"));
    } catch (error) {
        if (error.response.status === 403) {
            // Handle 403 Forbidden error, maybe show an error message
            console.error(
                "Unauthorized action: You don't have permission to perform this action."
            );
        } else {
            // Handle other errors
            console.error("An error occurred:", error.message);
        }
    }
};



  return (
      <div>
          <h2>Create Item</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Name:</label>
                  <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                  />
              </div>
              <div>
                  <label>Description:</label>
                  <textarea
                      name="description"
                      value={data.description}
                      onChange={(e) => setData("description", e.target.value)}
                  />
              </div>
              <button type="submit">Create</button>
          </form>
      </div>
  );
};

export default ItemForm;
