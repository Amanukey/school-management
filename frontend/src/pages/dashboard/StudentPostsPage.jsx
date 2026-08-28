import { useEffect, useState } from "react";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import api from "../../api/client";

const StudentPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/student/posts");
      setPosts(data);
    };

    load();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Academic & Sports Posts For Me
      </Typography>

      {posts.map((post) => (
        <Card key={post._id}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {post.title}
              </Typography>
              <Chip
                label={post.category === "academic" ? "Academic" : "Sports"}
                color={post.category === "academic" ? "primary" : "success"}
                size="small"
              />
            </Stack>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              {post.content}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              By {post.teacher?.user?.name || "Teacher"} on {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {!posts.length && (
        <Typography variant="body2" color="text.secondary">
          No posts assigned to you yet.
        </Typography>
      )}
    </Stack>
  );
};

export default StudentPostsPage;
