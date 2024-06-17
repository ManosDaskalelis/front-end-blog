import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './components/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './components/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './components/blog-post/edit-blogpost/edit-blogpost.component';

export const routes: Routes = [
    {
        path: "admin/categories",
        component: CategoryListComponent
    },
    {
        path: "admin/categories/add",
        component: AddCategoryComponent
    },
    {
        path: "admin/categories/:id",
        component: EditCategoryComponent
    },
    {
        path: "admin/blogposts",
        component: BlogpostListComponent
    },
    {
        path: "admin/blogposts/add",
        component: AddBlogpostComponent
    },
    {
        path: "admin/blogposts/:id",
        component: EditBlogpostComponent
    }
];
