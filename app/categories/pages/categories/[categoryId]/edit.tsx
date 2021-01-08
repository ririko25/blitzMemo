import CategoryForm from "app/categories/components/CategoryForm"
import updateCategory from "app/categories/mutations/updateCategory"
import getCategory from "app/categories/queries/getCategory"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditCategory = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "number")
  const [category, { setQueryData }] = useQuery(getCategory, { where: { id: categoryId } })
  const [updateCategoryMutation] = useMutation(updateCategory)
  const currentUser = useCurrentUser()

  return (
    <div>
      <h1>Edit Category {category.id}</h1>
      <pre>{JSON.stringify(category)}</pre>

      <CategoryForm
        initialValues={category}
        onSubmit={async (event) => {
          if (currentUser) {
            try {
              const updated = await updateCategoryMutation({
                where: { id: category.id },
                data: { name: event.target[0].value, user: { connect: { id: currentUser.id } } },
              })
              await setQueryData(updated)
              alert("Success!" + JSON.stringify(updated))
              router.push(`/categories/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error editing category " + JSON.stringify(error, null, 2))
            }
          }
        }}
      />
    </div>
  )
}

const EditCategoryPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCategory />
      </Suspense>

      <p>
        <Link href="/categories">
          <a>Categories</a>
        </Link>
      </p>
    </div>
  )
}

EditCategoryPage.getLayout = (page) => <Layout title={"Edit Category"}>{page}</Layout>

export default EditCategoryPage
