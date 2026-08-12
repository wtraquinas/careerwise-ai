"""add application user ownership

Revision ID: 1fac3bda6c73
Revises: 3974dc3559d8
Create Date: 2026-08-12 09:44:25.098242

"""
"""add application user ownership"""

from alembic import op
import sqlalchemy as sa


revision = "1fac3bda6c73"
down_revision = "3974dc3559d8"
branch_labels = None
depends_on = None


def upgrade():
    # 1. Add ownership temporarily as nullable.
    op.add_column(
        "applications",
        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    # 2. Assign existing applications to the admin.
    op.execute(
        """
        UPDATE applications
        SET user_id = (
            SELECT id
            FROM users
            WHERE email = 'admin@careerwiseai.com'
        )
        WHERE user_id IS NULL
        """
    )

    # 3. Ownership is mandatory.
    op.alter_column(
        "applications",
        "user_id",
        existing_type=sa.Integer(),
        nullable=False,
    )

    # 4. Foreign key.
    op.create_foreign_key(
        "fk_applications_user_id_users",
        "applications",
        "users",
        ["user_id"],
        ["id"],
    )

    # 5. Index.
    op.create_index(
        "ix_applications_user_id",
        "applications",
        ["user_id"],
    )


def downgrade():
    op.drop_index(
        "ix_applications_user_id",
        table_name="applications",
    )

    op.drop_constraint(
        "fk_applications_user_id_users",
        "applications",
        type_="foreignkey",
    )

    op.drop_column(
        "applications",
        "user_id",
    )