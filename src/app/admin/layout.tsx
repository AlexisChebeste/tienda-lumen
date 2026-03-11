

export default function LayoutAdmin() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <ul>
          <li><a href="/admin/orders">Orders</a></li>
          <li><a href="/admin/products">Products</a></li>
        </ul>
      </nav>
      <main>
        {/* Child routes will be rendered here */}
      </main>
    </div>
  );
}