import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';
import { BlogpostListComponent } from './components/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './components/blog-post/add-blogpost/add-blogpost.component';

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
        path: "admin/categories/delete/:id",
        component: DeleteCategoryComponent
    },
    {
        path: "admin/blogposts",
        component: BlogpostListComponent
    },
    {
        path: "admin/blogposts/add",
        component: AddBlogpostComponent
    }
];
