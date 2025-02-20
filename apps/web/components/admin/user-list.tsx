'use client';

import apiClient from '@/lib/apiClient';
import { Role } from '@/lib/type';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Pagination, Table } from 'react-bootstrap';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  blockedAt: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>();
  const [page, setPage] = useState('1');
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    async function fetchUsers() {
      const response = await apiClient.get(`user/all?page=${page}`);
      setUsers(response.users);
      setTotalPages(response.totalPages);
    }
    fetchUsers();
  }, [page]);

  useEffect(() => {
    const page = searchParams.get('page') || '1';
    setPage(page);
  }, [searchParams]);

  async function handleDelete() {
    await apiClient.post(`user/delete`, { usersId: selectedUsers });
    const response = await apiClient.get(`user/all?page=${page}`);
    setUsers(response.users);
    setTotalPages(response.totalPages);
    setSelectedUsers([]);
  }

  async function handleBlock() {
    await apiClient.post(`user/block`, { usersId: selectedUsers });
    const response = await apiClient.get(`user/all?page=${page}`);
    setUsers(response.users);
    setTotalPages(response.totalPages);
    setSelectedUsers([]);
  }

  async function handleUnblock() {
    await apiClient.post(`user/unblock`, { usersId: selectedUsers });
    const response = await apiClient.get(`user/all?page=${page}`);
    setUsers(response.users);
    setTotalPages(response.totalPages);
    setSelectedUsers([]);
  }

  async function handleSetRole(role: Role) {
    await apiClient.post(`user/role`, { usersId: selectedUsers, role: role });
    const response = await apiClient.get(`user/all?page=${page}`);
    setUsers(response.users);
    setTotalPages(response.totalPages);
    setSelectedUsers([]);
  }

  return (
    <>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <ButtonGroup>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" size="sm" onClick={handleBlock}>
            Block
          </Button>
          <Button variant="primary" size="sm" onClick={handleUnblock}>
            Unblock
          </Button>
        </ButtonGroup>

        <div>
          <span className="me-2">Set role:</span>
          <Button
            variant="primary"
            className="m-1"
            size="sm"
            onClick={() => handleSetRole(Role.ADMIN)}
          >
            Admin
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSetRole(Role.USER)}
          >
            User
          </Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '10px' }}>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.length ? (
            users.map((user: User) => (
              <tr key={user.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    value={user.id}
                    onChange={(e) =>
                      setSelectedUsers((prev) =>
                        prev.includes(e.target.value)
                          ? prev.filter((id) => id !== e.target.value)
                          : [...prev, e.target.value]
                      )
                    }
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.blockedAt ? 'Blocked' : 'Active'}</td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={5}>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination size="sm">
        {totalPages &&
          Array.from({ length: totalPages }, (_, index) => {
            const number = index + 1;
            return (
              <Pagination.Item
                key={number}
                active={number === Number(page)}
                onClick={() => router.push(`${path}?page=${number}`)}
              >
                {number}
              </Pagination.Item>
            );
          })}
      </Pagination>
    </>
  );
}
